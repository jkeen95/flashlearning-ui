#!/bin/bash
set -e
IFS='|'

AUTHCONFIG="{\
\"userPoolId\":\"us-east-1_EKiOVpdqH\",\
\"webClientId\":\"29idvltcrusbuv6les4qekpl94\",\
\"nativeClientId\":\"3st7jg2nlmi3mreaojsmpgm0ff\"\
\"identityPoolId\":\"us-east-1:d43d64bd-0412-40f4-a6af-5c048b7abe45\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\"\
}"

AMPLIFY="{\
\"envName\":\"dev\"\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"
CATEGORIES="{\
\"auth\":$AUTHCONFIG\
}"

amplify init \
--amplify $AMPLIFY \
--providers $PROVIDERS \
--categories $CATEGORIES \
--yes