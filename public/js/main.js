const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deletePark)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deletePark(){
    const hName = this.parentNode.childNodes[1].innerText
    const pName = this.parentNode.childNodes[3].innerText
    const pState = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deletePark', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'hikeNameS': hName,
              'parkNameS': pName,
              'parkStateS': pState
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const hName = this.parentNode.childNodes[1].innerText
    const pName = this.parentNode.childNodes[3].innerText
    const pState = this.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'hikeNameS': hName,
              'parkNameS': pName,
              'parkStateS': pState,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}