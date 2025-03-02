// import { expryInstance } from "@expry/system";
// import { basicOperations, BasicPrototypes } from "@expry/basic";
// import { formityOperations, FormityPrototypes } from "@expry/formity";

// type Prototypes = [BasicPrototypes, FormityPrototypes];

// const expry = expryInstance<Prototypes>(basicOperations, formityOperations);

// const value = expry([
//   {
//     $schema$form: {
//       values: {
//         name: ["", []],
//         surname: ["", []],
//         age: [20, []],
//       },
//       render: {},
//     },
//   },
//   {
//     $schema$form: {
//       values: {
//         softwareDeveloper: [true, []],
//       },
//       render: {},
//     },
//   },
//   {
//     $schema$cond: {
//       if: "$$softwareDeveloper",
//       then: [
//         {
//           $schema$variables: {
//             languagesOptions: [
//               { value: "js", label: "JavaScript" },
//               { value: "py", label: "Python" },
//               { value: "go", label: "Go" },
//             ],
//             questions: {
//               js: "What rating would you give to the JavaScript language?",
//               py: "What rating would you give to the Python language?",
//               go: "What rating would you give to the Go language?",
//             },
//           },
//         },
//         {
//           $schema$form: {
//             values: {
//               languages: [[], []],
//             },
//             render: {},
//           },
//         },
//         {
//           $schema$variables: {
//             i: 0,
//             languagesRatings: [],
//           },
//         },
//         {
//           $schema$loop: {
//             while: { $lt: ["$$i", { $size: "$$languages" }] },
//             do: [
//               {
//                 $schema$variables: {
//                   language: { $arrayElemAt: ["$$languages", "$$i"] },
//                 },
//               },
//               {
//                 $schema$variables: {
//                   question: {
//                     $getField: { field: "$$language", input: "$$questions" },
//                   },
//                 },
//               },
//               {
//                 $schema$form: {
//                   values: {
//                     rating: ["love-it", ["$$language"]],
//                   },
//                   render: {},
//                 },
//               },
//               {
//                 $schema$variables: {
//                   i: { $add: ["$$i", 1] },
//                   languagesRatings: {
//                     $concatArrays: [
//                       "$$languagesRatings",
//                       [{ name: "$$language", rating: "$$rating" }],
//                     ],
//                   },
//                 },
//               },
//             ],
//           },
//         },
//         {
//           $schema$return: {
//             fullName: { $concat: ["$$name", " ", "$$surname"] },
//             age: "$$age",
//             softwareDeveloper: true,
//             languages: "$$languagesRatings",
//           },
//         },
//       ],
//       else: [
//         {
//           $schema$form: {
//             values: {
//               interested: ["maybe", []],
//             },
//             render: {},
//           },
//         },
//         {
//           $schema$return: {
//             fullName: { $concat: ["$$name", " ", "$$surname"] },
//             age: "$$age",
//             softwareDeveloper: false,
//             interested: "$$interested",
//           },
//         },
//       ],
//     },
//   },
// ]);

// console.log(value);
