// ==UserScript==
// @name        ChelonianGall
// @namespace   cheloniangall.com
// @match       https://www.codingame.com/*
// @grant       none
// @version     1.0
// @icon        https://cheloniangall.com/images/icon.png
// @supportURL  https://cheloniangall.com/faq.php
// @author      BlaiseEbuth
// @description Integrate the ChelonianGall webchat in CodinGame.
// ==/UserScript==

"use strict";

var chatReady = false;

setInterval(

  function() {

    if (!chatReady) {

      var head = document.getElementsByTagName("head")[0];
      var columns = document.getElementsByClassName("column-contents")[0];
      var leftColumn = document.getElementById("scrollable-pane");

      if (head && columns && leftColumn) {

        columns.style = "\
          display: flex;\
          flex-direction: row;\
          justify-content: space-between;";

        leftColumn.style = "\
          width: auto;\
          position: static;\
          order: 0;\
          flex-grow: 2;";

        var chatStyle = document.createElement("style");
        var chatContainer = document.createElement("div");
        var chatToggle = document.createElement("div");
        var chat = document.createElement("iframe");

        chatStyle.textContent = "\
          #cg-chat-container {\
            order: 1;\
            width: fit-content;\
            height: 100%;\
          }\
          #cg-chat {\
            min-width: 301px;\
            height: 100%;\
            border: none\
          }\
          #cg-chat.hidden {\
            display: none;\
          }\
          #cg-chat-toggle {\
            position: fixed;\
            top: 50%;\
            right: 0;\
            z-index: 42;\
            width: fit-content;\
            height: fit-content;\
            padding: 5px 2px 5px 5px;\
            border-radius: 5px 0 0 5px;\
            background-color: rgb(242, 187, 19);\
            font-size: 20px;\
            font-weight: bold;\
            color: rgb(69, 76, 85);\
            cursor: pointer;\
          }\
          #cg-chat-toggle:hover {\
            background-color: rgb(222, 172, 22);\
          }\
          #cg-chat-toggle.open {\
            right: 301px;\
          }\
          #cg-chat-toggle::before {\
            content: '<';\
          }\
          #cg-chat-toggle.open::before {\
            content: '>';\
          }\
        ";

        chatContainer.id = "cg-chat-container";

        chatToggle.id = "cg-chat-toggle";
        chatToggle.classList.add("open");
        chatToggle.onclick = function ()
        {
          document.getElementById("cg-chat").classList.toggle("hidden");
          document.getElementById("cg-chat-toggle").classList.toggle("open");
        };

        chat.id = "cg-chat";
        chat.title = "ChelonianGall webchat";
        chat.src = "https://cheloniangall.com";

        head.appendChild(chatStyle);
        columns.appendChild(chatContainer);
        chatContainer.appendChild(chatToggle);
        chatContainer.appendChild(chat);

        chatReady = true;
      }
    }
  },
  100
);
