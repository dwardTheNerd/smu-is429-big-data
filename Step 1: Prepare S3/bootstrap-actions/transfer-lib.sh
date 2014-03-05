#!/bin/sh

hadoop fs -copyToLocal s3n://<your-s3-bucket>/lib/csv-serde-0.9.1.jar $HADOOP_HOME/lib/
