# DataCreator
A quick data generator that helps to generate test data for a required schema. The tool will provide random data or sequential data if requested. 

See configuration file : `config.json` 

```json
{
    "data" : {
        "records" : 10,
        "columns" :
            [
                { "name": "uid", "type" : "bigint", "length" : 8, "sequence" : true, "start" : 220}, 
                { "name": "acct_no", "type" : "char", "length" : 16 }, 
                { "name": "t_code", "type" : "int", "length" : 9 }, 
                { "name": "reason", "type" : "char", "length" : 2, "case": "UPPER"}, 
                { "name": "post_dt", "type" : "date", "start" : "2018-04-11 08:10:59" }, 
                { "name": "trans_dt", "type" : "date", "start" : "2018-04-11 08:10:59" },
                { "name": "amount", "type" : "float", "start" : 20, "end" : 40, "precision" : 2 }
            ],
        "output" : "csv" 
    }
        
}
```

## Configuration elements:
- `data.records` : Provide the number of records required to be generated
- `data.output` : Output mode (For now only csv is supported. Future will support JSON)
- `data.columns` : Set of column configuration 
- `data.columns.name` : Name of the column
- `data.columns.type` : Data type (supported types: `bigint`, `int`, `float`, `char`, `date`. Future will support more data types)
- `data.columns.length` : Length of the `char`, `int` or `bigint` to be generated. Adds leading zeros if required.
- `data.columns.case` : In case of `char`, helps provide random strings of `UPPER`, `LOWER`, `ALL`, or `CAPITALISE` cases.
- `data.columns.sequence` : In case of `bigint` or `int`, indicates if the data needs to be sequential or random. 
- `data.columns.start` : In case of `bigint`, `int`, `date`, indicates where to start from.
- `data.columns.end` : In case of `bigint`, `int`, `date`, indicates where to end at.
- `data.columns.precision` : In case of `float`, provides a precision after decimal point.


Feel free to contribute and/or improve the code


