#! /usr/bin/env node

const { LinkedList, BinaryTree, deepClone } = require('../utils')
const path = require('path')

const pArgs = process.argv.slice(2, process.argv.length)

const { func, argTypes, returnType, tests } = require(path.resolve(pArgs[0]))

// Convert function arguments into targeted data structure
const convertedArgs = Array.from(Array(tests.length), () => new Array())

for (let i = 0; i < tests.length; i++) {
  if (!tests[i]) {
    continue
  }

  for (let j = 0; j < argTypes.length; j++) {
    // FIXME: 
    // 1. Into strategy pattern
    // 2. circled list and intersected lists are not able to be generated
    if (argTypes[j] == 'ListNode[]') {
      const list = []
      for (let t of tests[i][j]) {
        list.push(new LinkedList(t))
      }
      convertedArgs[i].push(list)
    } else if (argTypes[j] == 'ListNode') {
      convertedArgs[i].push(new LinkedList(tests[i][j]))
    } else if (argTypes[j] == 'TreeNode') {
      convertedArgs[i].push(tests[i][j].length ? new BinaryTree(tests[i][j]) : null)
    } else if (argTypes[j] == 'Array') {
      convertedArgs[i].push(deepClone(tests[i][j]))
    } else if (argTypes[j] == 'Object') {
      convertedArgs[i].push(Object.assign({}, tests[i][j]))
    } else {
      convertedArgs[i].push(tests[i][j])
    }
  }
}


// Execute test cases
for (let i = 0; i < tests.length; i++) {
  let res = undefined

  try {
    res = func(...convertedArgs[i])
  } catch(e) {
    console.error(e)
  }

  if (res !== undefined) {
    console.log(`Test case (${i + 1}):`)
    console.log()
    console.log('Input:')
    tests[i].forEach(t => console.log(t))

    if (returnType == 'ListNode') {
      res = res ? res.toArray() : []
    } else if (returnType == 'TreeNode') {
      res = res ? res.toArray() : []
    }

    console.log()
    console.log('Output:')
    console.log(res)
    console.log()
    console.log()
  }
}
