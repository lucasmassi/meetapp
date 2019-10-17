export function createMeetupRequest(title, description, address, banner_id) {
  return {
    type: '@meetup/CREATE_MEETUP_REQUEST',
    payload: { title, description, address, banner_id },
  };
}

export function createMeetupFailure() {
  return {
    type: '@meetup/CREATE_FAILURE',
  };
}

export function updateMeetupRequest(data) {
  return {
    type: '@user/UPDATE_MEETUP_REQUEST',
    payload: { data },
  };
}

export function updateMeetupSuccess(meetup) {
  return {
    type: '@user/UPDATE_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function updateMeetupFailure() {
  return {
    type: '@user/UPDATE_MEETUP_REQUEST',
  };
}
