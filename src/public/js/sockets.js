(function (cbFn) {
  cbFn(window.jQuery, window)
})(function cbFn ($, window) {
  $(chatRoomReady)

  function chatRoomReady () {
    var $questionArea = $('.question')
    var $username = $questionArea.find('#name')
    var username = ''
    var socket = io('http://localhost:6969')
    var $formMessage = $('#form-message')
    var $roomChat = $('.message-room')
    var $message = $formMessage.find('input')
    $username.focus()
    $username.on('keyup', showChatRoom)
    $formMessage.on('submit', sendChatMessage)
    socket.on('chat:message', displayChatMessage)

    function showChatRoom (e) {
      var isPressEnter = e.which == 13
      if (isPressEnter) {
        username = $username.val()
        $questionArea.hide()
        $formMessage.show()
        $message.focus()
      }
    }

    function sendChatMessage (e) {
      e.preventDefault()
      var message = $message.val()
      $message.val('')
      socket.emit('chat:message', { username, message })
    }

    function displayChatMessage (chat) {
      $roomChat.append(`<p><strong>${chat.username}</strong>: ${chat.message}</p>`)
    }
  }
})
