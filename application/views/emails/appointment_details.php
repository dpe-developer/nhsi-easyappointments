<html lang="en">
<head>
    <title><?= lang('appointment_details_title') ?></title>
</head>
<body style="font: 13px arial, helvetica, tahoma;">
<div class="email-container" style="width: 650px; border: 1px solid #eee;">
    <div id="header" style="background-color: #429a82; height: 45px; padding: 10px 15px;">
        <strong id="logo" style="color: white; font-size: 20px; margin-top: 10px; display: inline-block">
            <?= $company_name ?>
        </strong>
    </div>

    <div id="content" style="padding: 10px 15px;">
        <h2><?= $email_title ?></h2>
        <p><?= $email_message ?></p>

        <h2><?= lang('appointment_link_title') ?></h2>
        <a href="<?= $appointment_link ?>" style="width: 600px;"><?= $appointment_link ?></a>

        <h2><?= lang('appointment_details_title') ?></h2>
        <table id="appointment-details">
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;"><?= lang('service') ?></td>
                <td style="padding: 3px;"><?= $appointment_service ?></td>
            </tr>
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;"><?= lang('provider') ?></td>
                <td style="padding: 3px;"><?= $appointment_provider ?></td>
            </tr>
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;">NOTE</td>
                <td style="padding: 3px;">
                    <strong>Your appointment schedule is in PHILIPPINE TIME.<br>The 'Start' time shown below is shown in YOUR LOCAL TIMEZONE (Please convert the 'Start' time shown below to PHILIPPINE TIMEZONE to view your appointment schedule in PHILIPPINE TIME and avoid confusion)</strong>
                </td>
            </tr>
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;"><?= lang('start') ?></td>
                <td style="padding: 3px;"><?= $appointment_start_date ?></td>
            </tr>
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;"><?= lang('timezone') ?></td>
                <td style="padding: 3px;"><?= $appointment_timezone ?></td>
            </tr>
        </table>

        <h2><?= lang('customer_details_title') ?></h2>
        <table id="customer-details">
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;"><?= lang('name') ?></td>
                <td style="padding: 3px;"><?= $customer_name ?></td>
            </tr>
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;"><?= lang('email') ?></td>
                <td style="padding: 3px;"><?= $customer_email ?></td>
            </tr>
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;"><?= lang('phone_number') ?></td>
                <td style="padding: 3px;"><?= $customer_phone ?></td>
            </tr>
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;"><?= lang('address') ?></td>
                <td style="padding: 3px;"><?= $customer_address ?></td>
            </tr>
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;"><?= lang('city') ?></td>
                <td style="padding: 3px;"><?= $customer_city ?></td>
            </tr>
            <tr>
                <td class="label" style="padding: 3px;font-weight: bold;"><?= lang('notes') ?></td>
                <td style="padding: 3px;"><?= $customer_notes ?></td>
            </tr>
        </table>
        <!-- Custom info -->
        <h2>Please read carefully</h2>
        <p>
            Dear <?= $customer_name ?> &nbsp; (date of birth), 
            <br>
            <br>
            Your appointment schedule is in PHILIPPINE TIME. The 'Start' time shown above is shown in YOUR LOCAL TIMEZONE (Please convert the 'Start' time shown above to PHILIPPINE TIMEZONE to view your appointment schedule in PHILIPPINE TIME and avoid confusion).
            <br>
            <br>
            <strong>Please be in the clinic 30 minutes before your scheduled time </strong>If for any reason you cannot make it to your appointment, please let us know within 48 hours of your appointment time.
            <br>
            <br>
            <strong>*Please note: If you are more than 15 minutes late for your scheduled appointment time, you will be given the option of either being seen that day as a walk-in, if the schedule permits, or rescheduled for a later date.</strong>
            <br>
            <br>
            <strong>REMINDERS:</strong>
            <br>
            <ol>
                <li>You are required to wear SURGICAL MASK and CLEAR FULL FACE SHIELD within the clinic's premises.</li>
                <li>Please bring black ball pen, your <strong>VALID ORIGINAL PASSPORT</strong> and (referral letter for Australia visa applicants only)</li>
                <li>Print and fill out the NHSBI form, COVID Health Checklist (for ALL visa applicants) and HIV DOH Form and consent form (15 years old and above visa applicants) at <a href="https://nhsiphilippines.com/davaocity/">davao.nhsiphlippines.com</a> <strong>BEFORE</strong> your appointment date.</li>
                <li><strong>Please print the appointment confirmation letter sent to you and present it upon your arrival at the clinic.</strong></li>
                <li>Cash payments are currently not accepted at our clinic.</li>
                <li>Please make sure to visit our website <a href="https://nhsiphilippines.com/">nhsiphilippines.com</a> and make sure to deposit the correct payment for your medical examination service.</li>
                <li>Laboratory tests are NON- FASTING.</li>
                <li>For New Zealand applicants, females within the reproductive age group are advised not to schedule their medical examination during their menstrual period. Otherwise, you will be required to come back one week after the last day of their menstruation.</li>
                <li>Companions will not be allowed inside the clinic, and we therefore strongly discourage clients from bringing one. (For elderly and PWDs who will need to be accompanied, please inform us beforehand so arrangements can be made.)</li>
            </ol>
        </p>
        <!-- END OF Custom info -->
    </div>

    <div id="footer" style="padding: 10px; text-align: center; margin-top: 10px;
                border-top: 1px solid #EEE; background: #FAFAFA;">
        <!-- Powered by
        <a href="https://easyappointments.org" style="text-decoration: none;">Easy!Appointments</a>
        | -->
        <a href="<?= $company_link ?>" style="text-decoration: none;"><?= $company_name ?></a>
    </div>
</div>
</body>
</html>
