#!/bin/sh

WD=$PWD
NUMFAIL=0
NUMPASS=0
NUMTESTS=0
cd ../../Tests
FILES=`find . -name *.html`
cd $WD
for FILE in $FILES; do
	REMAIN=`expr $NUMTESTS % 40`
	if [[ "x$REMAIN" == "x0" ]]; then
		if [[ "x$NUMTESTS" != "x0" ]]; then
			echo ' '
		fi
	fi

	NUMTESTS=`expr $NUMTESTS + 1`
	phantomjs HTMLCS_Test.js $FILE
	if [[ "x$?" == "x0" ]]; then
		NUMPASS=`expr $NUMPASS + 1`
		echo -n "PASS $FILE"
	else
		NUMFAIL=`expr $NUMFAIL + 1`
		echo -n "FAIL $FILE"
	fi
done

echo ''
echo "Tests: $NUMTESTS, Passed: $NUMPASS, Failed: $NUMFAIL"