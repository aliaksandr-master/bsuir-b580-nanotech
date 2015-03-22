//---------------------------------------------------------------------------

#ifndef Unit1H
#define Unit1H
//---------------------------------------------------------------------------
#include <Classes.hpp>
#include <Controls.hpp>
#include <StdCtrls.hpp>
#include <Forms.hpp>
//---------------------------------------------------------------------------
#include "PSControlTlb\PSControl_TLB.h"

class TForm1 : public TForm
{
__published:	// IDE-managed Components
        TButton *Button1;
        void __fastcall Button1Click(TObject *Sender);
private:	// User declarations
        
public:		// User declarations
        __fastcall TForm1(TComponent* Owner);
};

class TMyThread : public TThread
{
protected:
    virtual void __fastcall Execute();
public:
    __fastcall TMyThread();

private:
    TCOMIPowerSupplyRControl m_ptrPSControl;
};

//---------------------------------------------------------------------------
extern PACKAGE TForm1 *Form1;
//---------------------------------------------------------------------------
#endif
 