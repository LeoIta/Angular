import { CanDeactivateFn } from '@angular/router';
import { RoutingUserComponent } from '../routing-user/routing-user.component';
import { EditField } from '../models/edit-field.model';

export const authEditGuard: CanDeactivateFn<EditField> = (
  component,
  _currentRoute,
  _currentState,
  _nextState
) => {
  console.log('authEdit guard');
  if (!component.isLogged() || !component.isAdmin()) {
    return true;
  } else if (component.anyChange() && !component.isSaved()) {
    return confirm(
      'There are unsaved changes.\n Are you sure you want to leave?\n All changes will be lost.'
    );
  } else {
    return true;
  }
};
