
let d=new Date()//a la place tu recupere depuis la base de donnees;
let delay=3455
d=Date.parse(d)//il mets le tout en millisecondes
setTimeout( //le setTimeout c'est pour juste simuler.
    ()=>{
        let d2=new Date()
        d2=Date.parse(d2)
        let n=(d2-d)/ 1000 //passe de millisecondes a secondes
        
        let i=setInterval(
            ()=>{
                console.log(n)
                if (n===0){
                    alert('time is up')
                    clearInterval(i)
                }
                n=n-1
            },1000
        )
    },Math.floor(delay/1000)*1000
)