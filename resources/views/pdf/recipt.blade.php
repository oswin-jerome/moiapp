<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $event->name }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, Helvetica, sans-serif;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
    </style>
</head>

<body style="padding: 8px;padding-top:20px">
    <h1 style="text-align: center">{{ $event->name }}</h1>
    <br>
    <br>
    <table>

        <tbody>
            <tr>
                <th>Name</th>
                <td>{{ $gift->name }}</td>
            </tr>
            <tr>
                <th>Date & Time</th>
                <td> {{ Carbon\Carbon::parse($event->date)->format('d-m-Y h:m A') }}</td>
            </tr>
            <tr>
                <th>Amount</th>
                <td>{{ $gift->amount }}</td>
            </tr>
            <tr>
                <th>Gifted to</th>
                <td>{{ $gift->gifted_to }}</td>
            </tr>
            <tr>
                <th>Note</th>
                <td>{{ $gift->note }}</td>
            </tr>
        </tbody>

    </table>

    <br>
    <p style="text-align: center">Thanks for celebrating with us.</p>
</body>

</html>
