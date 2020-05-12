const request=require('request')
const geocode=(address,callback)=>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGlzaGFudHNldGhpMSIsImEiOiJjazl2NmQ3ZDEwOGt4M2hydW44c3Q1bWcxIn0.0w3TTD-DZyNcNL-lqqCl4Q&limit=1'
    request({url,json:true},(error,response)=>
    {
        if(error){
            callback('unable to connect',undefined)
        }
        else if(response.body.features.length===0)
        {
            callback('unavle to find location',undefined)
        }
        else 
        {
            callback(undefined,
                {
                    lat:response.body.features[0].center[0],
                    lon:response.body.features[0].center[1],
                    loc:response.body.features[0].place_name
                })
        }
    })
}
module.exports=geocode