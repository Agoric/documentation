<template>
  <div>
    <button id="chatbot-button" @click="openModal">
        <img id="chat-button" src="/agoric-logo-red.svg" alt="Chat" />
    </button>
    <div id="chatbot-modal" v-if="isModalOpen" @click.self="closeModal">
      <div id="chatbot-modal-content">
        <span id="chatbot-close" @click="closeModal">&times;</span>
        <iframe src="http://localhost:3000" style="width: 100%; height: 100%; border: none;"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style>
#chatbot-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #414853; /*#515c67;*/
  color: white;
  padding: 0; 
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 60px; 
  height: 60px; 
  display: flex;
  align-items: center;
  justify-content: center;
}

#chat-button {
  width: 80%; 
  height: auto; 
}

#chatbot-modal {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

#chatbot-modal-content {
  background-color: #ffffff;
  margin-right: 20px; 
  padding: 0;
  border: 1px solid #888;
  border-radius: 10px; 
  width: 400px;
  height: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

#chatbot-close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin: 10px;
  cursor: pointer;
}

#chatbot-close:hover,
#chatbot-close:focus {
  color: black;
  text-decoration: none;
}

#chat-iframe {
  flex: 1;
  width: 100%;
  border: none;
  border-radius: 10px;
}
</style>