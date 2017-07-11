# statement_processor

statement records is delivered in two formats, CSV and XML. These records need to be validated.

There are two validations:

1. all transaction references should be unique
2. the end balance needs to be validated

At the end of the processing, a report needs to be created which will display both the transaction reference and description of each of the failed records.
