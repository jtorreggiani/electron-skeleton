// Third party depedencies
import fetch from 'electron-fetch';
import Store from 'electron-store';

// Application dependencies
import { BASE_URL, DEFAULT_OPTIONS } from '../constants/urls';

// Initialization
const store = new Store();

export async function sendAccessCode(phoneNumber, event) {
  console.log('did this event attempt to re-render the main process?')

  try {
    // 1. Make post request to send access code.
    const response = await fetch(`${BASE_URL}/api/send_access_code`, {
      method: 'POST',
      body: JSON.stringify({ phone_number: phoneNumber }),
    });
    // 2. Confirm response is successful.
    if (response.ok) {
      // 3. Parse JSON response.
      const json = await response.json();
      // 4. Set study participant token in Electron store.
      store.set('USER_TOKEN', json.token);

      // something might need to happen here, dunno, but it's here for now
      store.set('ONBOARDING_STEP', 'CONFIRM_ACCESS_CODE');

      // 5. Emit Ipc message.
      event.sender.send('send-access-code-success', `success!`);
    } else {
      throw('Something went wrong');
    }
  } catch (e) {
    console.log('error', e)
    event.sender.send('send-access-code-error', `error`);
  }
}

// POST /api/confirm_access_code
export async function confirmAccessCode(accessCode, event) {
  // 1. Grab user token from Electron store.
  const userToken = store.get('USER_TOKEN');

  // 2. Make post request to confirm access code.
  const response = await fetch(`${BASE_URL}/api/confirm_access_code`, {
    ...DEFAULT_OPTIONS,
    method: 'POST',
    body: JSON.stringify({
      access_code: accessCode,
      token: userToken,
    }),
  });

  // 3. Confirm the response is successful.
  if (response.ok) {
    // 4. Parse the JSON response.
    const json = await response.json();

    // 5. Set survey token in Electron store.
    store.set('SURVEY_TOKEN', json.survey_id);
    store.set('SURVEY_ID', json.survey_id);
    store.set('SURVEY_TABLE_KEY', json.table_key);
    store.set('ONBOARDING_STEP', 'SETUP');

    // 6. Emit IPC success message.
    event.sender.send('check-access-code-success', `success`);
  } else {
    event.sender.send('check-access-code-error', `error`);
  }

  return true;
}

// POST /api/confirm_serial_number
export async function confirmSerialNumber(ipcEvent, options) {
  // 1. Make post request to confirm access code.
  const response = await fetch(`${BASE_URL}/api/confirm_serial_number`, {
    ...DEFAULT_OPTIONS,
    method: 'POST',
    body: JSON.stringify({
      serial_number: store.get('SERIAL_NUMBER'),
    }),
  });

  // 2. Confirm the response is successful.
  if (response.ok) {
    // 3. Parse the JSON response.
    const json = await response.json();

    // 4. Set survey token in Electron store.
    store.set('SURVEY_TOKEN', json.survey_id);
    store.set('SURVEY_ID', json.survey_id);
    store.set('SURVEY_TABLE_KEY', json.table_key);
    store.set('ONBOARDING_STEP', 'SETUP');

    // 5a. Emit IPC success message.
    ipcEvent.sender.send('confirm-serial-number-success', `success`);
  } else {
    // 5b. Emit IPC error mesage.
    ipcEvent.sender.send('confirm-serial-number-error', `error`);
  }

  return true;
}
