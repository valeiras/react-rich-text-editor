/* eslint-disable @typescript-eslint/no-unused-vars */
const generateSaveEvent = () => {
  const event = new Event('save-editor-state');
  dispatchEvent(event);
};
