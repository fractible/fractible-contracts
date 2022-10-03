#! /bin/sh

BUILD_PATH=`completium-cli get completium property build_path`
TESTS_PATH=`completium-cli get completium property tests_path`

if [ $# -ge 1 ]; then
  TEST_BUILD_PATH=${BUILD_PATH}/${TESTS_PATH}/${1}.js
else
  TEST_BUILD_PATH=${BUILD_PATH}/${TESTS_PATH}/*.js
fi

#echo "Seeding accounts ..."
#completium-cli transfer 10tz from alice to carl --force
#completium-cli transfer 10tz from alice to daniel --force
#completium-cli transfer 10tz from alice to eddy --force
#completium-cli transfer 10tz from alice to flo --force
#completium-cli transfer 10tz from alice to gary --force
#completium-cli transfer 10tz from alice to hugo --force
#completium-cli transfer 10tz from alice to ian --force
#completium-cli transfer 10tz from alice to jacky --force
#completium-cli transfer 10tz from alice to kevin --force
#completium-cli transfer 10tz from alice to tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx --force

echo "Running tests ..."
rm -rf ${BUILD_PATH} && npx tsc --outDir ${BUILD_PATH} && mocha --timeout 0 --slow 99999999999999999 ${TEST_BUILD_PATH}
