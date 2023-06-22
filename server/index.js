const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// This is your test secret API key.
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.scg3zw6.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const verifyJWT = (req, res, next) => {
    // console.log(req.headers.authorization)
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized' })
    }
    const token = authorization.split(' ')[1]
    // console.log('36line ', token)

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'unauthorized' })
        }
        // console.log('36', decoded)
        req.decoded = decoded;
        next()
    })
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        client.connect();

        const database = client.db('PhotographyCompDB')
        const usersCollection = database.collection('users')
        const classCollection = database.collection('class')
        const bookingsCollection = database.collection('bookings')
        const paymentsCollection = database.collection('payments')

        //---------admin verifier----------
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            if (user?.role !== 'admin') {
                return res.status(403).send({ error: true, message: 'forbidden message' });
            }
            next();
        }
        //---------instructor verifier----------
        const verifyInstructor = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            if (user?.role !== 'instructor') {
                return res.status(403).send({ error: true, message: 'forbidden message' });
            }
            next();
        }
        //---------Student verifier----------
        const verifyStudent = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            if (user?.role !== 'student') {
                return res.status(403).send({ error: true, message: 'forbidden message' });
            }
            next();
        }

        // --------------------------------------------------------

        //get top 6 classes
        app.get('/top_classes', async (req, res) => {
        const result = await classCollection.find().sort({ numOfStd: -1 }).limit(6).toArray()
            res.send(result)
        })

        //get top 6 instructor
        app.get('/top_instructors', async (req, res) => {
            const query = { role: 'instructor' }
            const result = await usersCollection.find(query).limit(6).toArray()
            res.send(result)
        })

        //get all approved classes
        app.get('/get_approved_classes', async (req, res) => {
            const filter = { status: 'approved' }
            const result = await classCollection.find(filter).toArray()
            res.send(result)
        })

        //get all instructors
        app.get('/get_instructors', async (req, res) => {
            const query = { role: 'instructor' }
            const result = await usersCollection.find(query).toArray()
            res.send(result)
        })

        // -------------Student related routes -------------

        // booked class by std
        app.post('/book_classes', async (req, res) => {
            const booking = req.body
            console.log(booking)
            const query = { classId: booking.classId, studentEmail: booking.studentEmail, paymentStatus: 'selected' }
            console.log(query)
            const existingItem = await bookingsCollection.findOne(query)
            if (existingItem) {
                return res.send({ message: 'class already booked' })
            }
            const result = await bookingsCollection.insertOne(booking)
            res.send(result)
        })

        //delete booking class
        app.delete('/delete_booked_classs/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const filter = { _id: new ObjectId(id) }
            const result = bookingsCollection.deleteOne(filter)
            res.send(result)
        })

        //get student classes according to status
        app.get('/get_std_classes', verifyJWT, verifyStudent, async (req, res) => {
            let query = {}
            if (req.query.studentEmail && req.query.paymentStatus) {
                query = { studentEmail: req.query.studentEmail, paymentStatus: req.query.paymentStatus }
            }
            const pipeline = [
                {
                    $addFields: {
                        classIdObject: {
                            $toObjectId: '$classId'
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'class',
                        localField: 'classIdObject',
                        foreignField: '_id',
                        as: 'classData'
                    }
                },
                {
                    $unwind: '$classData'
                },
                {
                    $match: query
                }
            ];

            const result = await bookingsCollection.aggregate(pipeline).toArray()
            res.send(result)
        })

        //update cls status
        app.patch('/update_classes_seats/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            let currentSeats;
            let cuurentNumOfStd
            const existingItem = await classCollection.findOne(filter)
            console.log(existingItem)
            if (existingItem) {
                currentSeats = existingItem.availableSeats
                cuurentNumOfStd = existingItem.numOfStd
                console.log(currentSeats)
            }
            const updatedItemInfo = {
                $set: {
                    availableSeats: currentSeats - 1,
                    numOfStd: cuurentNumOfStd + 1
                }
            }
            const result = await classCollection.updateOne(filter, updatedItemInfo)
            res.send(result)
        })

        //update payment stauts
        app.patch('/update_booked_classes/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)

            const filter = { _id: new ObjectId(id) }

            const updatedItemInfo = {
                $set: {
                    paymentStatus: 'paid',
                }
            }
            const result = await bookingsCollection.updateOne(filter, updatedItemInfo)
            res.send(result)
        })

        // -----------payments related routes----------

        //geenerate client seceret
        app.post('/create-payment-intent', verifyJWT, async (req, res) => {
            const { total } = req.body
            // console.log('total',total)
            if (total) {
                const amount = parseFloat(total) * 100
                if (!amount) return
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(amount),
                    currency: 'usd',
                    payment_method_types: ['card'],
                })
                res.send({
                    clientSecret: paymentIntent.client_secret,
                });
            }
        })
        //get payment 
        app.get('/get_payments', verifyJWT, verifyStudent, async (req, res) => {
            console.log(req.query.studentEmail)
            let query = {}
            if (req.query.studentEmail) {
                query = { studentEmail: req.query.studentEmail }
            }
            const pipeline = [
                {
                    $addFields: {
                        classIdObject: {
                            $toObjectId: '$classId'
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'class',
                        localField: 'classIdObject',
                        foreignField: '_id',
                        as: 'classData'
                    }
                },
                {
                    $unwind: '$classData'
                },
                {
                    $match: query
                }
            ];

            const result = await paymentsCollection.aggregate(pipeline).sort({ date: -1 }).toArray()
            res.send(result)
        })
        //save payment 
        app.post('/payments', async (req, res) => {
            const paidItems = req.body
            console.log(paidItems)
            try {
                const result = await paymentsCollection.insertOne(paidItems);
                res.send(result);
            } catch (error) {
                console.log(error)
            }
        })


        // -----------user related routes -----------

        //get a user
        app.get('/user', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = { email: req.query.email }
            }
            const result = await usersCollection.findOne(query)
            res.send(result)
        })

        //insert users
        app.post('/users', async (req, res) => {

            const userInfo = req.body
            console.log(userInfo)
            const query = { email: userInfo.email }
            console.log(query)
            const existingItem = await usersCollection.findOne(query)
            if (existingItem) {
                return res.send([{ message: 'email already exists' }])
            }
            const result = await usersCollection.insertOne({ ...userInfo, role: 'student' })
            res.send(result)
        })


        // -----------instructor related routes----------

        //get instructor cls
        app.get('/get_classes', verifyJWT, verifyInstructor, async (req, res) => {
            let query = {}
            if (req.query.instructorEmail) {
                query = { instructorEmail: req.query.instructorEmail }
            }
            const result = await classCollection.find(query).toArray()
            res.send(result)
        })

        //add cls
        app.post('/add_class', async (req, res) => {
            const saveItem = { ...req.body, status: 'pending', numOfStd: 0 }
            console.log('saveItem', saveItem)
            const result = await classCollection.insertOne(saveItem)
            res.send(result)
        })

        //update class
        //update payment stauts
        app.put('/update_class/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const options = { upsert: true }
            const filter = { _id: new ObjectId(id) }
            const newInfo = req.body
            const updatedItemInfo = {
                $set: {
                    ...newInfo
                }
            }
            const result = await classCollection.updateOne(filter, updatedItemInfo)
            res.send(result)
        })

        //-------admin releated route------------

        //get all classes
        app.get('/get_all_classes', verifyJWT, verifyAdmin, async (req, res) => {
            const result = await classCollection.find().toArray()
            res.send(result)
        })

        //update cls status
        app.patch('/update_class_status/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }

            const updatedItemInfo = {
                $set: {
                    status: req.query.status,
                }
            }
            const result = await classCollection.updateOne(filter, updatedItemInfo)
            res.send(result)
        })

        //insert feedback
        app.patch(`/send_feedback/:id`, async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updatedItemInfo = {
                $set: {
                    feedback: req.body.feedBack,
                }
            }
            const result = await classCollection.updateOne(filter, updatedItemInfo, options)
            res.send(result)
        })

        //get all user
        app.get('/users', verifyJWT, verifyAdmin, async (req, res) => {
            const result = await usersCollection.find().toArray()
            res.send(result)
        })

        //update users role 
        app.patch('/update_user_role/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }

            const updatedItemInfo = {
                $set: {
                    role: req.query.role,
                }
            }
            const result = await usersCollection.updateOne(filter, updatedItemInfo)
            res.send(result)
        })


        //----------------------------jwt API.....---------..---------...
        app.post('/jwt', (req, res) => {
            const user = req.body
            // console.log(user)
            const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '9hr' })
            // console.log(token)
            res.send({ token })
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send(' as12 is running')
})

app.listen(port, () => {
    console.log('server is running on port', +port)
})