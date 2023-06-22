//save user
export const saveUsers = async (user) => {
    console.log(user)
    const res = await fetch(`https://photography-campus-server.vercel.app/users`,{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data
}
