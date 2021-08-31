module.exports = {
  roots: ["<rootDir>/src"],
    collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts, tsx}",
      "!**.*.d.ts"
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
      coverageDirectory: "coverage",
      testEnvironment: "jsdom",
      transform:{
      ".+\\.(ts|tsx)$":"ts-jest"
},
      moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
        "@entities/(.*)": "<rootDir>/src/domain/entities/$1",
        "@usecases/(.*)": "<rootDir>/src/domain/usecases/$1",
        "@repositories/(.*)": "<rootDir>/src/data/repositories/$1",
        "@datasource/(.*)": "<rootDir>/src/data/datasource/$1",
        "@models/(.*)": "<rootDir>/src/data/models/$1",
        "@service/(.*)": "<rootDir>/src/service/$1",
        "@pages/(.*)": "<rootDir>/src/presentation/pages/$1",
        "@components/(.*)": "<rootDir>/src/presentation/components/$1",
        "@factories/(.*)": "<rootDir>/src/main/factories/$1",
        "@main/(.*)": "<rootDir>/src/main/$1",
}
}
