const parser = require("./grammar").parser;

var program = "x is 5. y is 6. z is x + y. show z. ";
function main() {
  var ast = parser.parse(program)
  var source = codegen(ast);

  console.log(source);
}

function codegen(ast) {
  switch (ast[0]) {
    case "Program":
      return codegenList(ast.slice(2));
    case "NumberLit":
      return ast[1].val;
    case "IdentExpr":DDd
      return ast[1].name;
    case "AddExpr":
      return codegen(ast[2]) + " + " + codegen(ast[3]);
    case "IsStmt":
      return ast[2] + " = " + codegen(ast[3]) + ";\n";
    case "ShowStmt":
      return "console.log(" + codegen(ast[2]) + ");\n";
    default:
      throw "Unknown statement/expression: " + ast[0];
  }
}

function codegenList(list) {
  return list.reduce(function(prev, curr) {
    return prev + codegen(curr);
  }, "");
}

main();
