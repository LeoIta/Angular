export class AnimalsService {
  animals = ['dog', 'cat', 'lion'];

  addAnimals(animal: string) {
    this.animals.push(animal);
  }
}
