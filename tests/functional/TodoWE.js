define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    var url = '../../src/tpls/index.html';
    var urls = '../../src/tpls/index.html#/admin/MainView';

    registerSuite({
        name: 'TodoWE (functional)',

        'submit form': function () {
            //console.log(window.location.href);
            console.log("sb");
            return this.remote
                .get(require.toUrl(url))
                .findById('we-todo')
                .click()
                .end()
                .pressKeys('13067235235')
                .findById('weP-todo')
                .click()
                .end()
                .pressKeys('ysys66')
                .findById('weL-todo')
                .click()
                .end()
                ;
        },
        'login': function () {
            console.log("sa");
            //console.log(window.location.herf);
            //console.log(window.location.url);
            return this.remote
                .findById('we-ap')
                .click()
                .end()
                .findById('projectId')
                .click()
                .end()
                .pressKeys('0566')
                .findById('projectName')
                .click()
                .end()
                .pressKeys('5440')
                .findById('projectSynopsis')
                .click()
                .end()
                .pressKeys('04545')
                .findById('submitButton')
                .click()
                .end()
                ;
        }
    });
});