const path=require('path')
const hbs=require('hbs')
const express=require('express')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()
const port=process.env.PORT || 3000
app.use(express.static(path.join(__dirname,'../public')))
const part=path.join(__dirname,'/partials')
hbs.registerPartials(part)
app.set('view engine','hbs')
app.get('',(req,res)=>{
res.render('view',{
    title:'weather',
    name:'dishant'
})
})
app.get('/help',(req,res)=>{
    res.render('help',{
        tit:'help!',
        name:'dishant'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'dish'
    })

})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'provide address'
        })
    }
geocode(req.query.address,(error,{lat,lon,loc}={})=>{
    if(error){return res.send({error})}
    forecast(lat,lon,(error,fdata)=>{
        if(error){return res.send({error})}
        res.send({
            forecast:fdata,
            location:loc,
            address:req.query.address
        })
    })
})
})
app.get('/products',(req,res)=>{
    if(!req.query.rating){
        return res.send({
            error:'provide'
        })
    }
    console.log(req.query.rating)
    res.send({
        products:[]
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        error:'not found 404',
        name:'dishant'
    })
})
app.listen(port,()=>{
    console.log('server started')
})