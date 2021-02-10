import moment from 'moment';

export function scrollBoxUp(box) {
  box.scrollTop = box.scrollHeight;
}

export function showErrorBox(message) {
  const errorBox = document.querySelector('.file_upload_error-box');
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');

  const intID = setTimeout(() => {
    errorBox.classList.add('hidden');
    errorBox.textContent = '';
    clearTimeout(intID);
  }, 2000);
}

export function updateStates(manager, type, data = {}) {
  const method = type;
  const request = { method, data };
  let { lastChange } = manager.state.conditions;



  if (!manager.ws) {
    showErrorBox('No server connection!');
    return;
  }

  if (type === 'newTask') {
    lastChange = data.timestamp;
  }

  if (type === 'deleteTask'
      || type === 'editTask'
      || type === 'switchGeo'
      || type === 'switchFavorite'
      || type === 'switchPinnedOn'
      || type === 'switchPinnedOff') {
    lastChange = moment().valueOf();
    manager.state.conditions.lastChange = lastChange;
    request.data.lastChange = lastChange;
  }



  manager.ws.send(JSON.stringify(request));
}

export function createTextTask(manager, Task, data) {

  const newTask = new Task(data);
  newTask.init(manager.tasksBoxEl, manager.state);


  manager.inputEl.value = '';

  scrollBoxUp(manager.tasksBoxEl);
  manager.creatingTask = newTask;
  // updOnAction('addTask', document.querySelector('.file_manager'), manager.creatingTask);
  // manager.state.conditions.lastChange = newTask.timestamp;
}

export function createInfoTask(manager, Task, task) {
  manager.state.info.push(task.id);
  const newTask = new Task(task);
  const html = newTask.createInfoMarkup();
  manager.ctrlAsideEl.querySelector('.aside_wrapper').insertAdjacentHTML('beforeend', html);
  manager.ctrlAsideEl.classList.remove('hidden');
}

export function isValidCoords(coords) {
  if (!coords.latitude || !coords.longitude) {
    return false;
  }

  if (isNaN(coords.latitude) || isNaN(coords.longitude)) {
    return false;
  }

  if (Math.abs(coords.latitude) > 90 || Math.abs(coords.longitude) > 180) {
    return false;
  }

  return true;
}

export function delTaskFromState(state, taskId) {
  state.tasks = state.tasks.filter(({ id }) => id !== taskId);
}

export function getTaskById(state, taskId) {
  return state.tasks.find(({ id }) => id === taskId);
}

function addLinkTags(string) {
  return `<a href=${string} target="_blank">${string}</a>`;
}

function addParagraphTags(string) {
  return `<p class="message_paragraph">${string}</p>`;
}

function parseLink(html) {
  const reg = /\bhttp[s]?:\/\/[^\s]*/g;

  if (!reg.test(html)) {
    return html;
  }

  const linkedHtml = html.replace(reg, addLinkTags);
  return linkedHtml;
}

function parseRows(html) {
  const reg = /(.+)$/gm;

  const dividedHtml = html.replace(reg, addParagraphTags);
  return dividedHtml;
}

export function parseInputContent(content) {
  return parseRows(parseLink(content));
}

export function getPinnedType(task) {
  switch (task.type) {
    case 'message':
      return 'Text message';
    case 'coords':
      return 'Geolocation message';
    case 'audio':
      return 'Audio message';
    case 'video':
      return 'Video message';
    case 'video_record':
      return 'Video record';
    case 'audio_record':
      return 'Audio record';
    case 'file':
      return 'File message';
    case 'image':
      return 'Image message';
    default:
  }
}
