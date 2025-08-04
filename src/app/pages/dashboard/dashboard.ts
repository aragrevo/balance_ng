import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserAvatarComponent } from '@app/components/user-avatar/user-avatar';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'dashboard',
  imports: [UserAvatarComponent],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  user = toSignal(this.authService.user$, {
    requireSync: true,
  });

  signOut() {
    this.authService.signOut();
  }
}
