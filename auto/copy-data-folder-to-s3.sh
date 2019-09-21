#!/bin/bash

FILES=data/*
S3URI=s3://send-that-invoice-data
for f in $FILES
do
  echo "Move $f file... to s3 bucket - $S3URI"
  aws s3 cp $f $S3URI/$f
done