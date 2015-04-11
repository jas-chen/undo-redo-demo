'use strict'

var UserList = (function () {
    var USER_LIST = "userList";

    var _users = [];

    return {
        save: function() {
            localStorage.setItem(USER_LIST, JSON.stringify(_users));
            alert('存擋成功');
        },
        load: function() {
            var users = localStorage.getItem(USER_LIST);
            if(users) {
                users = JSON.parse(users);
                users.forEach(function(user){
                   user.birthday = new Date(user.birthday);
                });
                _users = users;
                renderUserList(_users);
            }
        },
        add: function (user) {
            _users.push(user);
            renderUserList(_users);
        },
        remove: function (i) {
            _users.splice(i, 1);
            renderUserList(_users);
        },
        redo: function() {
            console.log('redo');
        },
        undo: function() {
            console.log('undo');
        }
    };

}());

var renderUserList = (function () {
    var userTpl = document.getElementById('user-tpl').innerHTML;
    var hUserTpl = Handlebars.compile(userTpl);
    var userListElement = document.getElementById('user-list');
    return function (data) {
        var html = hUserTpl(data);
        userListElement.innerHTML = html;
    }
}());

(function init() {
    Handlebars.registerHelper("localeDate", function (date) {
        return date ? date.toLocaleDateString() : '';
    });

    UserList.load();

    function handleSubmit(e) {
        e.preventDefault();

        var user = {
            name: document.getElementById('input-user-name').value,
            email: document.getElementById('input-user-email').value,
            birthday: new Date(document.getElementById('input-user-birthday').value),
            habits: document.getElementById('input-user-habits').value.split(',').map(function (s) {
                return s.trim();
            })
        };

        console.log(user);

        UserList.add(user);
        document.forms[0].reset();
    }

    document.forms[0].addEventListener('submit', handleSubmit);


    function redo() {
        UserList.redo();
    }

    function undo() {
        UserList.undo();
    }

    function save() {
        UserList.save();
    }

    document.getElementById('save-btn').addEventListener('click', save);
    document.getElementById('redo-btn').addEventListener('click', redo);
    document.getElementById('undo-btn').addEventListener('click', undo);
}());