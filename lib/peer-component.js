    function dispatch(name, detail = {}){
      const initialize_event = new CustomEvent(name, {detail: detail})
      document.dispatchEvent(initialize_event)
    }





class PeerComponent extends HTMLElement {
  connectedCallback(){
    /*
      Gets the target-id
    */    

    this.peer = new Peer()

    this.peer.on('open', (id) => {
      this.target_id = this.getAttribute('target-id')
      if(this.target_id === null){
        const route = `https://montage-organ.herokuapp.com/montage-organ-controller.html?&target-id=${id}`
        this.QR_CODE = document.createElement('qr-code')
        this.QR_CODE.setAttribute('value', route)
        this.appendChild(this.QR_CODE)
      } else {
        this.connection = this.peer.connect(this.target_id)
        this.connection.on('data', (data) => {
          this.innerHTML = data
        })
      }
    })

    this.peer.on('connection', (conn) => {
      this.connection = conn
      this.QR_CODE.remove()
      this.innerHTML = 'peered to ' + conn.peer

      conn.on('data', (data) => {
        dispatch('new-controller-data', data)
      })
    })


  }

  static get observedAttributes() {
    return [];
  }

  handleInputChange(){

  }

  handleTextAreaChange(){

  }

  handleCanvas(canvas){

  }

  handleImage(img){

  }

  handleVideo(video){

  }

  handleAudio(audio){

  }

  sendMessage(message){
    this.connection.send(message)
  }

  update(){
    console.log('updating!')
    if(!this.connection) return

    this.connection.send(this.innerHTML)

    // send new HTML to all peers
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('peer-component', PeerComponent)


