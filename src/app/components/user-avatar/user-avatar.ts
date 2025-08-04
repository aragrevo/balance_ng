import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '@app/models/user.model';

@Component({
  selector: 'user-avatar',
  imports: [],
  template: `<img
    src="{{user().avatar}}"
    alt="Profile picture {{user().name}}"
    class="h-12 w-12 rounded-full object-cover"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  user = input.required<User>();
}
