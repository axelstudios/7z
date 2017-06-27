import _ from 'lodash';

class textInputController {
  /** @ngInject */
  constructor($window) {
    _.defer(() => {
      const element = $window.document.querySelector('#output input.text-input');
      if (element) {
        element.focus();
      }
    });
  }

  save() {
    this.onSave({text: this.text});
  }

  handleKeypress(e) {
    if (e.keyCode === 13) {
      this.save();
    }
  }
}

export const textInput = {
  template: require('./textInput.html'),
  controller: textInputController,
  bindings: {
    onSave: '&',
    placeholder: '@',
    text: '<'
  }
};
