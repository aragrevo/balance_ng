import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@app/models/user.model';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'user-avatar',
  imports: [],
  template: `<img
    src="{{user()?.avatar}}"
    alt="Profile picture {{user()?.name}}"
    class="h-12 w-12 rounded-full object-cover [view-transition-name:user-avatar]"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  private readonly authService = inject(AuthService);
  user = toSignal(this.authService.user$, {
    requireSync: true,
  });
}
