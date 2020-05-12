const request=require('request')
const forecast=(a,b,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=6b8352e140dbe936780ad9bde3d9f648&query='+b+','+a
    request({url,json:true},(error,{body})=>
    {
        if(error)
        {
            callback('not connnected',undefined)
        }
        else if(body.error)
        {
            callback('not found',undefined)
        }
        else{
            callback(undefined,
                body.current.weather_descriptions[0]
            )
        }
    })
}
module.exports=forecast