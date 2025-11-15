/**
 * API Response Messages
 */

export default {
  success: {
    board: {
      created: 'Create board successfully.',
      updated: 'Update board successfully.',
      deleted: 'Delete board successfully.',
      detail: 'Get board detail successfully.',
      list: 'Get a list of boards successful.',
      moved_card: 'Move card successfully.'
    },
    column: {
      created: 'Create column successfully.',
      updated: 'Update column successfully.',
      deleted: 'Delete column successfully.',
      detail: 'Get column detail successfully.',
      list: 'Get a list of columns successful.'
    },
    card: {
      created: 'Create card successfully.',
      updated: 'Update card successfully.',
      deleted: 'Delete card successfully.',
      detail: 'Get card detail successfully.',
      list: 'Get a list of cards successful.'
    },
    auth: {
      registered: 'Register successfully.',
      logged_in: 'Login successfully.',
      logged_out: 'Logout successfully.',
      refreshed_token: 'Token refreshed successfully.'
    }
  },
  error: {
    common: {
      400: 'Bad Request.',
      401: 'Unauthorized.',
      403: 'Forbidden.',
      404: 'Not Found.',
      405: 'Method Not Allowed.',
      406: 'Not Acceptable.',
      422: 'Unprocessable Content.',
      500: 'Internal Server Error.'
    },
    validation: 'Please correct the errors below and try again.',
    board: {
      not_found: 'Board not found.',
      create_failed: 'Failed to create board.',
      update_failed: 'Failed to update board.',
      delete_failed: 'Failed to delete board.',
      get_failed: 'Failed to retrieve board.',
      get_all_failed: 'Failed to retrieve boards.',
      already_exists: 'Board already exists.',
      invalid_data: 'Invalid board data.',
      id_required: 'Board ID is required.',
      access_denied: 'Access denied to this board.'
    },
    column: {
      not_found: 'Column not found.',
      create_failed: 'Failed to create column.',
      update_failed: 'Failed to update column.',
      delete_failed: 'Failed to delete column.',
      get_failed: 'Failed to retrieve column.',
      get_all_failed: 'Failed to retrieve columns.',
      already_exists: 'Column already exists.',
      invalid_data: 'Invalid column data.',
      id_required: 'Column ID is required.',
      board_not_found: 'Board not found for this column.',
      board_id_required: 'Board ID is required for column.'
    },
    card: {
      not_found: 'Card not found.',
      create_failed: 'Failed to create card.',
      update_failed: 'Failed to update card.',
      delete_failed: 'Failed to delete card.',
      get_failed: 'Failed to retrieve card.',
      get_all_failed: 'Failed to retrieve cards.',
      already_exists: 'Card already exists.',
      invalid_data: 'Invalid card data.',
      id_required: 'Card ID is required.',
      column_not_found: 'Column not found for this card.',
      column_id_required: 'Column ID is required for card.',
      board_not_found: 'Board not found for this card.'
    },
    auth: {
      email_required: 'Email is required.',
      password_required: 'Password is required.',
      username_required: 'Username is required.',
      email_invalid: 'Email is invalid.',
      password_invalid: 'Password is invalid.',
      username_invalid: 'Username is invalid.',
      email_exists: 'Email already exists.',
      username_exists: 'Username already exists.',
      password_match: 'Password and confirm password do not match.',
      email_or_password_incorrect: 'Email or password is incorrect.',
      invalid_token: 'Invalid or expired token.',
      refresh_token_required: 'Refresh token is required.'
    }
  }
}
