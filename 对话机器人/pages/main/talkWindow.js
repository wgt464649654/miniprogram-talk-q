const app = getApp()

Page({
  data: {
    showMessages: [],
    allQuestions: {
      liaoren: [
        {
          question: '我想问一条路？',
          answer: '去往你心里的路!',
        }
      ]
    },
    currentQuestions: [],
    questionNum: 0
  },

  onShow: function () {
    let questions = this.data.allQuestions[this.data.type]
    this.setData({
      userInfo: getApp().globalData.userInfo,
      currentQuestions: questions,
    })
    this.addNewResponse('question');
  },

  msgInputEvent: function(e) {
    this.setData({
      messageForSend: e.detail.value,
      blankValue: ''
    })
  },

  sendMessage: function () {
    let _this = this
    let message = _this.data.messageForSend
    if (!message) {
      setTimeout(() => {
        message = _this.data.messageForSend
        _this.messageToShow(message)
      }, 100)
    }
    if (message) {
      _this.messageToShow(message)
    }
  },

  messageToShow: function (message) {
    let _this = this;
    _this.data.showMessages.push({
      status: 'process',
      text: message,
      type: 'send'
    })
    this.setData({
      showMessages: _this.data.showMessages
    })
    // reset msg
    _this.data.messageForSend = ''
    this.robortResponse(message)
  },

  robortResponse: function (msg) {
    if (msg.indexOf('什么') > -1) {
      this.addNewResponse('answer')
    }
  },

  // 生成新的问题或回答
  addNewResponse: function (respType) {
    let type = this.data.type
    let questionNum = this.data.questionNum
    let questions = this.data.currentQuestions
    let text = ''
    if (respType === 'question') {
      text = questions[questionNum].question
    } else if (respType === 'answer') {
      text = questions[questionNum].answer
    }
    this.data.showMessages.push({
      text: text,
      type: 'receive'
    })
    setTimeout(
      () => {
        this.setData({
          showMessages: this.data.showMessages
        })
      }, 1000)
  },

  onLoad: function (options) {
    this.setData({
      type: options.type
    })
  }  
})