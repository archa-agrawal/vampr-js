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
      currentVampire = currentVampire.creator;
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

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const offspring of this.offspring) {
      const vampire = offspring.vampireWithName(name);
      if (vampire) {
        return vampire;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    return this.offspring.reduce((a,c) => a + c.totalDescendents, this.offspring.length);
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    const yearConvertedList = [];
    if (this.yearConverted && this.yearConverted > 1980) {
      yearConvertedList.push(this);
    }
    for (const offspring of this.offspring) {
      yearConvertedList.push(...offspring.allMillennialVampires);
    }
    return yearConvertedList;
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
