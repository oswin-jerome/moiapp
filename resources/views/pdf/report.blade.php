<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Report - {{ $event->name }}</title>
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
    <p style="text-align: center"> {{ Carbon\Carbon::parse($event->date)->format('d-m-Y') }}</p>
    <p style="text-align: center"> Showing: {{ $gifted_to }} Gifts</p>
    <br>
    <br>
    <br>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Gifted To</th>
                <th>Amount</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($gifts as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->created_at->format('d-m-Y - h:m A') }}</td>
                    <td>{{ $item->gifted_to }}</td>
                    <td>{{ $item->amount }}</td>
                </tr>
            @endforeach

        </tbody>
        <tfoot>
            <tr>
                <th></th>
                <th></th>
                <th>No of Gifts</th>
                <td>{{ count($gifts) }}</td>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th>Total</th>
                <td>{{ $total }}</td>
            </tr>
        </tfoot>
    </table>
</body>

</html>
