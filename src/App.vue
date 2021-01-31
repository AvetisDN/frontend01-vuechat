<template>
  <div id="app">
    <div class="login" v-if="!name">
      <h3>Join Chat</h3>
      <label for="username">Username</label>
      <input type="text" id="username" v-model="userName">
      <button @click="saveUsername()">Join</button>
    </div>
    <div class="chat" v-else>
      <h3>Vue Chat</h3>
      <h5>Welcome {{name}}</h5>
      <div class="chat-messages">
        <div class="chat-message" v-for="msg in messages" :key="msg.id">
          <span class="chat-message__username">
            {{msg.username}}
            <i>
              {{msg.date | formatDate}}
            </i>
          </span>
          <p class="chat-message__text">
            {{msg.text}}
          </p>
        </div>
      </div>
      <div class="chat-form">
        <input type="text" id="chat-message" v-model="message">
        <button @click="sendMessage()">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import db from './firebase'
export default {
  name: 'App',
  data() {
    return {
      userName: '',
      name: null,
      messages: [],
      message: ''
    }
  },
  methods: {
    saveUsername() {
      this.name = this.userName
      this.userName = ''
    },
    sendMessage() {
      const msg = {
        username: this.name,
        text: this.message,
        date: Date.now()
      }
      db.ref('messages').push(msg)
      this.message = ''
    }
  },
  mounted() {
    const chatMessages = db.ref('messages')
    let that = this
    chatMessages.on('value', snapshot => {
      let data = snapshot.val()
      let messages = []
      Object.keys(data).forEach(key => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text,
          date: data[key].date
        })
      })
      that.messages = messages
    })
  },
  filters: {
    formatDate(date) {
      let newDate = new Date(date)
      return newDate.toLocaleString('ru')
    }
  }
}
</script>