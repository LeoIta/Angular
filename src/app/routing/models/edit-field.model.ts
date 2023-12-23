export interface EditField {
  isLogged(): boolean;
  isAdmin(): boolean;
  anyChange(): boolean;
  isSaved(): boolean;
}
