class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let distanceFromOriginal = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator
      distanceFromOriginal++;
    }
    return distanceFromOriginal;
  }
  get nameOfAllAncestor() {
    const listOfAncestors = [];
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      listOfAncestors.push(currentVampire);
    }
    return listOfAncestors;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const seniorityOfThisVampire = this.numberOfVampiresFromOriginal;
    const seniorityOfOtherVampire = vampire.numberOfVampiresFromOriginal;
    if (seniorityOfThisVampire < seniorityOfOtherVampire) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    const creatorOfThis = this.creator;
    const creatorOfOther = vampire.creator;
    if (this === vampire) {
      return this;
    }
    if (!creatorOfThis) {
      return this;
    }
    if (!creatorOfOther) {
      return vampire;
    }
    if (creatorOfThis === creatorOfOther) {
      return creatorOfThis;
    }
    
    const ancestorsOfVampire = vampire.nameOfAllAncestor;
    const ancestorsOfThis = this.nameOfAllAncestor;
    if (ancestorsOfVampire.includes(this)) {
      return this;
    };
    if (ancestorsOfThis.includes(vampire)) {
      return vampire;
    };

    for (const ancestor of ancestorsOfVampire) {
      for (const ansc of ancestorsOfThis) {
        if (ancestor === ansc) {
          return ancestor;
        }
      }
    }
  }
}

module.exports = Vampire;

