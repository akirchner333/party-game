const basic = (scorer) => {
  return (props) => {
    return props.players.reduce((acc, p) => {
      acc[p.name] = scorer(p);
      return acc;
    }, {});
  }
}

const comparison = (correct, right, wrong) => {
  return basic((p) => p.guess == correct ? right : wrong);
}

// Gives the same score to everyone, regardless of value
const flat = (score) => basic((p) => score)

// Converts the guess into an int
const parse = (defaultScore=0) => basic((p) => parseInt(p.guess) || defaultScore)

const existence = (right, wrong) => basic((p) => p.guess ? right : wrong);

export {basic, comparison, flat, parse, existence}