//---------------------------------------------------------------------------

#include <vcl.h>
#pragma hdrstop

#include "Unit1.h"
//---------------------------------------------------------------------------
#pragma package(smart_init)
#pragma resource "*.dfm"

#include <fstream>
TForm1 *Form1;
//---------------------------------------------------------------------------
__fastcall TForm1::TForm1(TComponent* Owner)
        : TForm(Owner)
{
}

//---------------------------------------------------------------------------

void __fastcall TForm1::Button1Click(TObject *Sender)
{
    TThread *thrd = new TMyThread();
    thrd->Resume();
    Button1->Enabled = false;
    Button1->Caption = "Working";
}
//---------------------------------------------------------------------------

__fastcall TMyThread::TMyThread( )
    : TThread(true)
{
    FreeOnTerminate = true;
    // setup other thread parameters as needed...
}

void __fastcall TMyThread::Execute()
{
   const int index = 0;
   	try
	{
                m_ptrPSControl = CoPowerSupplyControl::Create();
	}
	catch( ... )
	{
		// сервер не зарегистрирован, пробуем зарегистрировать

		STARTUPINFO si;
		PROCESS_INFORMATION pi;

		::ZeroMemory( &si, sizeof(si) );
		si.cb = sizeof(si);
		::ZeroMemory( &pi, sizeof(pi) );

		AnsiString sCommandLine = ExtractFilePath(Application->ExeName);
		sCommandLine += "\\PSControl.exe /regserver";

		BOOL bResult = ::CreateProcess(
			NULL, // no module name.
			sCommandLine.c_str(),	// Command line.
			NULL,		// Process handle not inheritable.
			NULL,		// Thread handle not inheritable.
			FALSE,		// Set handle inheritance to FALSE.
			0,		// No creation flags.
			NULL,		// Use parent's environment block.
			NULL,		// Use parent's starting directory.
			&si,		// Pointer to STARTUPINFO structure.
			&pi );		// Pointer to PROCESS_INFORMATION structure.
		if(!bResult)
		{
			ShowMessage("COM сервер PSControl не найден");
			Application->Terminate();
			return;
		}

		// Wait until child process exits.
		::WaitForSingleObject( pi.hProcess, INFINITE );

		// Close process and thread handles.
		::CloseHandle( pi.hProcess );
		::CloseHandle( pi.hThread );

		// пытаемся подключиться к серверу еще раз
		try
		{
			m_ptrPSControl = CoPowerSupplyControl::Create();
		}
		catch( ... )
		{
			ShowMessage("COM сервер PSControl не найден");
			Application->Terminate();
			return;
		}

	}

  m_ptrPSControl->RPsUpdateDataFromDevice(index);
  m_ptrPSControl->RPsChangeRemoteControlMode(index, true);

            	// получение текущего состояния выбранного ИП
  ERPowerSupplyState state;
  m_ptrPSControl->RPsGetCurrentState(0, &state);

  const unsigned ping_time_msesc = 100;

  m_ptrPSControl->RPsChangeRemoteControlMode(0, true);
  for(;;)
  {
    // получение измеренных значений
    long nMU, nMI;
    m_ptrPSControl->RPsGetMsrVoltage(index, &nMU);
    m_ptrPSControl->RPsGetMsrCurrent(index, &nMI);
    std::ofstream log_file("log.txt");
    log_file << nMU << " " << nMI;
    log_file.close();

    long mvolts;
    long mamps;
    std::ifstream settings_file("settings.txt");
    settings_file >> mvolts >> mamps;
    settings_file.close();

    m_ptrPSControl->RPsSetMaxCurrent(0, mamps);
    m_ptrPSControl->RPsSetVoltage(0, mvolts);

    Sleep(ping_time_msesc);
  }
    // do work here ...
    // if you need to access the UI controls,
    // use the TThread::Synchornize() method for that
}
//---------------------------------------------------------------------------
