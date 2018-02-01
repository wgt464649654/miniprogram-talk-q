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
      ],
      qianzou: [
        {
          question: '叫我干啥！',
          answer: '我不听，我要去吃鸡了，88',
        }
      ],
      bapo: [
        {
          question: '你和你对象昨天晚上去干嘛了啊？',
          answer: '好狗粮，我饱了！',
        }
      ],
      daodao: [
        {
          question: '天冷了，多穿点，秋裤穿了没？',
          answer1: '没穿？赶紧回去穿！',
          answer2: '都中年人了还要什么风度！',
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
      }, 500)
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
    if (this.data.type === 'liaoren' && msg.indexOf('什么') > -1) {
      this.addNewResponse('answer')
    }
    if (['qianzou', 'bapo'].indexOf(this.data.type) > -1) {
      this.addNewResponse('answer')
    }
    if (['daodao'].indexOf(this.data.type) > -1) {
      this.addNewResponse('answer1')
      this.addNewResponse('answer2')
    }
  },

  // 生成新的问题或回答
  addNewResponse: function (respType) {
    let type = this.data.type
    let questionNum = this.data.questionNum
    let questions = this.data.currentQuestions
    let text = ''
    text = questions[questionNum][respType]
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