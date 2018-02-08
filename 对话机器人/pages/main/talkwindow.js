const app = getApp()

Page({
  data: {
    showMessages: [],
    playDot: true,
    playLine: false,
    played: false,
    allQuestions: {
      liaoren: [
        {
          question: '我想问一条路？',
          answer: '去往你心里的路!',
          rejectAnswer: '请按套路出牌',
          endFlag: 'answer'
        },
        {
          question: '5秒钟后我要为你放烟花！',
          auto: true,
          func: 'playFireworks'
        }
      ],
      qianzou: [
        {
          question: '叫我干啥！',
          answer: '我不听，我要去吃鸡了，再见，拜拜，色呦哪啦，888888',
        }
      ],
      bapo: [
        {
          question: '小Q还在搜集八婆咨询。。。',
          answer: '小Q还在搜集八婆咨询。。。',
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
      }, 400)
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
    if (this.data.type === 'liaoren' && this.data.questionNum === 0) {
      if (msg.indexOf('什么') > -1) {
        this.addNewResponse('answer')
      } else {
        this.addNewResponse('rejectAnswer')
      }
    }
    if (this.data.type === 'liaoren' && this.data.questionNum === 1) {
      if (msg.indexOf('放烟花') > -1) {
        this.addNewResponse('question')
      }
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
    let endFlag = questions[questionNum].endFlag
    let auto = questions[questionNum].auto
    this.data.showMessages.push({
      text: text,
      type: 'receive'
    })
    setTimeout(
      () => {
        this.setData({
          showMessages: this.data.showMessages,
        })
      }, 1000)

    if (auto) {
      if (questions[questionNum].func === 'playFireworks') {
        setTimeout(() => {
          this.setData({
            fireworks: 'play'
          })
          if (!this.data.played) {
            this.playFireworks()
          }
        }, 5000)
      }
    }

    if (respType === endFlag) {
      this.setData({
        questionNum: questionNum + 1
      })
      setTimeout(
        () => {
          this.addNewResponse('question')
        }, 2000)
    }
  },

  onLoad: function (options) {
    this.setData({
      type: options.type
    })
  },

  close: function () {
    console.log(this)
    this.setData({
      fireworks: null
    })
  },

  playFireworks: function() {
    this.setData({
      played: true
    })
    setTimeout(() => {
      this.setData({
        playDot: false,
        playLine: true
      })
      setInterval(() => {
        this.setData({
          playDot: false,
          playLine: true
        })
      }, 2000)
    }, 1600)
    setInterval(() => {
      this.setData({
        playDot: true,
        playLine: false
      })
    }, 2000)
  }
})