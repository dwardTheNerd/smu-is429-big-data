#!/bin/sh

hadoop fs -copyToLocal s3n://<your-s3-bucket>/bootstrap-actions/csv-serde-0.9.1.jar $HADOOP_HOME/lib/
