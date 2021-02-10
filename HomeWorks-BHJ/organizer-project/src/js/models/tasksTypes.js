import TextTask from './TextTask';
import CoordsTask from './CoordsTask';


export const tasksTypes = {
  message: TextTask,
  coords: CoordsTask,
  // image: ImageTask,
  // video: VideoTask,
  // audio: AudioTask,
  // audio_record: AudioRecordTask,
  // video_record: VideoRecordTask,
  // application: FileTask,
  // file: FileTask,
};

export default tasksTypes;
