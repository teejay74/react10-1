import GeoAddModal from './models/GeoAddModal';
import EditModal from './models/EditModal';
import DeleteModal from './models/DeleteModal';
import WSEvents from './api/WSEvents';
import eventHandlers from './events/eventHandlers';

export default class AppController {
  constructor(url) {
    this.url = url;
    this.container = document.querySelector('.container_organizer');

    this.state = {
      tasks: [],
      conditions: { geo: false, pinnedTask: null, lastChange: null },
      info: [],
    };

    this.geoAllowedStatus = true;
    this.creatingTask = null;
    this.taskUnderAction = null;
  }

  init() {
    this.initModals();
    this.initElements();
    this.initWSConnection();
    this.eventsInit();
  }

  initElements() {
    this.inputEl = document.querySelector('.textarea_task');
    this.textareaTask = document.querySelector('.textarea_task');
    this.footerSticks = document.querySelectorAll('footer .icon');
    this.tasksBoxEl = document.querySelector('.main-container_content');
    this.forms = document.querySelectorAll('.form-modal');
    this.uploadEl = document.querySelector('.upload_input');
    this.dragableEl = document.querySelector('.draggable_area');
    this.mngAsideEl = document.querySelector('.media_status_aside');
    this.ctrlAsideEl = document.querySelector('.info_aside');
    this.pinnedMessage = document.querySelector('.pinned_message');
  }

  initModals() {
    this.modals = {
      geoModal: new GeoAddModal(),
      editModal: new EditModal(),
      delModal: new DeleteModal(),
    };
  }

  initWSConnection() {
    this.ws = new WebSocket(this.url);

    this.ws.binaryType = 'blob';
    this.registerSocketEvents();
  }

  // initEvents() {

  //    this.textareaTask.addEventListener('input', (event) => {
  //    eventHandlers.myInputHandler.bind(this, event)();

  //   });

  //   this.textareaTask.addEventListener('keydown', (event) => {
  //     console.log('tut')
  //     // eventHandlers.myInputHandler.bind(this, event)();
  //   });

  // }

  eventsInit() {
    this.footerSticks.forEach((stick) => {
      stick.addEventListener('click', (event) => {
        eventHandlers.onStickClickHandler.call(this, event);
      });
    });

    this.forms.forEach((form) => {
      form.addEventListener('click', (event) => {
        eventHandlers.modalHandler.call(this, event);
      });
    });

    this.tasksBoxEl.addEventListener('click', (event) => {
      eventHandlers.taskHandler.call(this, event);
    });

    this.inputEl.addEventListener('input', (event) => {
      eventHandlers.myInputHandler.call(this, event);
    });

    this.inputEl.addEventListener('keydown', (event) => {
      eventHandlers.myInputHandler.call(this, event);
    });
  }

  registerSocketEvents() {
    const handlers = new WSEvents(this);
    this.ws.onopen = () => handlers.onWSOpen(this);
    this.ws.onclose = () => handlers.onWSClose(this);
    this.ws.onmessage = (e) => handlers.onWSMessage(this, e);
  }

  getModal(modalName) {
    return this.modals[modalName];
  }
}
