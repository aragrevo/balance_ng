import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {

  private readonly authService = inject(AuthService)

  async signIn() {
    try {
      const resp = await this.authService.signInWithGithub()
      console.log(resp);

    } catch (error) {
      console.error(error)
    }
  }
}
