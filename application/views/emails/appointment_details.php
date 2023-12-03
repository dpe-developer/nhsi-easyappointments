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
        <h3><?= $email_message ?></h3>
        <br>
        <br>
        <h2>Please read carefully</h2>
        <p>
            Dear <?= $customer_name ?>, 
            <br>
            <br>
            <strong>The appointment time you made will only be used to reserve the day chosen.</strong> 
            <br>            
            <br>            
            <strong>Your final arrival time at the clinic will be <span style="color:blue">either 7:30 am, 11:00 am or 2:00 pm.</span> Final confirmation of your appointment date and time will be emailed to you once you reply to this email with the attached photo of your deposit slip within 3 working days. Failure to do so will result to the cancellation of your appointment schedule.</strong>
            <br>
            <br>
            <span style="color:red">NOTE:</span> WE DO NOT ACCEPT BANK TRANSFERS. WE ALSO DO NOT ACCEPT REMITTANCES FROM BOTH FOREIGN AND LOCAL MONEY TRANSFER AGENCIES. Acceptable forms of payment are <span style="color:blue">OVER THE COUNTER DEPOSIT</span> to below bank account details:
            <br>
            <br>
            <strong>Banco De Oro (BDO)</strong><br>
            NATIONWIDE HEALTH SYSTEMS INC.<br>
            003620008692
            <br>
            <br>
            <strong>REMINDERS:</strong>
            <br>
            <ol>
                <li>You are required to wear <strong>SURGICAL MASK and CLEAR FULL FACE SHIELD within the clinic’s premises.</strong></li>
                <li>Please bring black ball pen, your <strong>VALID ORIGINAL PASSPORT</strong> and (referral letter for Australia visa applicants only)</li>
                <li><strong>To facilitate processing,</strong> please print and fill out the NHSBI form, COVID Health Checklist (for ALL visa applicants) and HIV DOH Form and consent form (15 years old and above visa applicants) from our website <a href="https://nhsgroup.ph/baguio.html">nhsgroup.ph/baguio.html</a> <strong>BEFORE</strong> your appointment date.</li>
                <li><strong>Please print the appointment confirmation letter that will be sent to you after you have replied with this email with your scanned deposit slip and present it upon your arrival at the clinic.</strong></li>
                <li>Cash payments are currently not accepted at our clinic.</li>
                <li>BRING YOUR ORIGINAL DEPOSIT SLIP as proof of payment.</li>
                <li>Laboratory tests are NON- FASTING.</li>
                <li>Companions will not be allowed inside the clinic, and we therefore strongly discourage clients from bringing one. (For elderly and PWDs who will need to be accompanied, please inform us beforehand so arrangements can be made.)</li>
            </ol>
        </p>
   
        <p>   
            <h4>Below you can see the appointment details. You can make changes in your appointment by clicking the appointment link below.</h4>
        </p>  

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
            Dear <?= $customer_name ?>, 
            <br>
            <br>
            Your appointment schedule is in PHILIPPINE TIME.<br>The 'Start' time shown above is shown in YOUR LOCAL TIMEZONE (Please convert the 'Start' time shown above to PHILIPPINE TIMEZONE to view your appointment schedule in PHILIPPINE TIME and avoid confusion).
            <br>
            <br>
             This email confirms your Immigration Medical Examination appointment at Nationwide Health Systems Aux, Inc Makati. <strong>Please be in the clinic 30 minutes before your scheduled time </strong>and proceed to Room 24-A (second floor near the elevator) for initial screening and registration. If for any reason you cannot make it to your appointment, please let us know within 48 hours of your appointment time.
        </p>
        <br>
        <br>

        <strong>*Please note: If you are more than 30 minutes late for your scheduled appointment time, you will be given the option of either being seen that day as a walk-in, if the schedule permits, or rescheduled for a later date.</strong>

        <br>
        <br>

        <strong>REMINDERS:</strong>
        <br>
        <ol>
            <li>You are required to wear SURGICAL MASK within the clinic's premises.</li>
            <li>Please bring your <strong>VALID ORIGINAL PASSPORT</strong> (for Canada, Australia and New Zealand applicants) and referral letter for Australia visa applicants only</li>
            <li>Print and fill out the HIV DOH Form and consent form (15 year old and above PERMANENT visa applicants) at <a href="https://nhsiphilippines.com/makaticity/">https://nhsiphilippines.com/makaticity/</a> <strong>BEFORE</strong> your appointment date.</li>
            <li><strong>Please proceed to room 24-A (screening room) for registration.</strong></li>
            <li>Kindly bring black or blue ball pen.</li>
            <li>We only accept cash payments. For the fees, please visit our website at <a href="https://nhsiphilippines.com/makaticity/">https://nhsiphilippines.com/makaticity/</a></li>
            <li>Laboratory tests are NON- FASTING.</li>
            <li>For New Zealand applicants: Females within the reproductive age group are advised not to schedule their medical examination during their menstrual period. Otherwise, you will be required to come back one week after the last day of their menstruation.</li>
            <li>Companions will not be allowed inside the clinic, and we therefore strongly discourage clients from bringing one. (For elderly and PWDs who will need to be accompanied, please inform us beforehand so arrangements can be made.)</li>
        </ol>
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
