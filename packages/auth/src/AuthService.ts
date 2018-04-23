import Bluebird from "bluebird";
import Keycloak from "keycloak-js";
import { KeycloakError, KeycloakInitOptions, KeycloakInstance, KeycloakProfile, KeycloakPromise } from "keycloak-js";

/**
 * Wrapper class for {Keycloak.KeycloakInstance}
 */
export class AuthService {

  private auth: KeycloakInstance;

  constructor(config: any) {
    this.auth = Keycloak(config);
  }

  /**
   * Called to initialize the adapter.
   * @param initOptions Initialization options.
   * @returns A promise to set functions to be invoked on success or error.
   */
  public init(initOptions: KeycloakInitOptions): Bluebird<boolean> {
    if (!initOptions.onLoad) {
      initOptions.onLoad = "check-sso";
    }
    return new Bluebird((resolve, reject) => {
      return this.auth.init(initOptions).error(reject).success(resolve);
    });
  }

  /**
   * Loads the user's profile.
   * @returns A promise to set functions to be invoked on success or error.
   */
  public loadUserProfile(): Bluebird<KeycloakProfile> {
    return new Bluebird((resolve, reject) => {
      return this.auth.loadUserProfile().error(reject).success(resolve);
    });
  }

  /**
   * Redirects to login form.
   * @param options Login options.
   */
  public login(): Bluebird<void> {
    return new Bluebird((resolve, reject) => {
      return this.auth.login().error(reject).success(resolve);
    });
  }

  /**
   * Redirects to logout.
   * @param options Logout options.
   * @param options.redirectUri Specifies the uri to redirect to after logout.
   */
  public logout(): Bluebird<void> {
    return new Bluebird((resolve, reject) => {
      return this.auth.logout().error(reject).success(resolve);
    });
  }

  public isAuthenticated(): boolean  {
    return !!this.auth.authenticated;
  }

  /**
   * Get access to wrapped Keycloak object
   */
  public extract(): KeycloakInstance {
    return this.auth;
  }
}